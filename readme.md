src/
│
├── app/                     # Expo Router (screens)
│   ├── (tabs)/              
│   │   ├── index.tsx        # Top Stories
│   │   ├── best.tsx         # Best Stories
│   │   ├── ask.tsx          # Ask HN
│   │   ├── show.tsx         # Show HN
│   │   └── _layout.tsx
│   │
│   ├── story/
│   │   └── [id].tsx         # Story details screen
│   │
│   └── user/
│       └── [id].tsx         # User profile screen
│
├── shared/
│   ├── types.ts             # Item, User types
│   └── constants.ts
│
├── services/
│   ├── api/
│   │   ├── client.ts        # fetch wrapper
│   │   └── endpoints.ts     # your current file
│   │
│   └── hooks/
│       ├── useStories.ts
│       ├── useStory.ts
│       └── useUser.ts
│
├── components/
│   ├── StoryCard.tsx
│   ├── CommentItem.tsx
│   ├── Loader.tsx
│   └── ErrorView.tsx
│
├── store/                   # optional (zustand/redux)
│   └── storyStore.ts
│
├── utils/
│   ├── formatTime.ts
│   └── helpers.ts
│
└── theme/
    ├── colors.ts
    └── spacing.ts
# HackerNews-Native
