import { atom } from 'recoil';
// Current user ID (can be used for multi-user support)
export const currentUserIdState = atom<number>({
  key: 'currentUserId',
  default: parseInt(process.env.EXPO_PUBLIC_USER_ID || '1', 10),
});

// Toast notification state for swipe actions
export const swipeToastState = atom<{
  visible: boolean;
  type: 'like' | 'nope' | null;
}>({
  key: 'swipeToast',
  default: {
    visible: false,
    type: null,
  },
});

