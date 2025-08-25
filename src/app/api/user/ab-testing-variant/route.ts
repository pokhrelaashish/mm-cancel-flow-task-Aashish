import { NextRequest, NextResponse } from 'next/server';
import { generateDeterministicVariant } from '@/lib/ab-testing';

// Simple in-memory store (reset on server restart)
const variantStore: Record<string, 'A' | 'B'> = {};

// In a real app, you'd pull this from auth/session
async function getCurrentUser() {
  return { id: 'user-123-test' };
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. If we already assigned this user, return the same variant
    if (variantStore[user.id]) {
      return NextResponse.json({ variant: variantStore[user.id] });
    }

    // 2. Otherwise, generate and persist in memory
    const newVariant = generateDeterministicVariant(user.id);
    variantStore[user.id] = newVariant;

    console.log(`[MOCK] Stored variant for ${user.id}: ${newVariant}`);

    return NextResponse.json({ variant: newVariant });

  } catch (error) {
    console.error('Error in POST /api/user/ab-testing-variant:', error);
    // Default fallback → A
    return NextResponse.json({ variant: 'A' }, { status: 500 });
  }
}
