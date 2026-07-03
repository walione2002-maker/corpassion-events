import re

with open('data/events.ts', 'r', encoding='utf-8') as f:
    file = f.read()

# Replace Amsterdam Ticket Tiers
file = re.sub(r"('amsterdam-enterprise-ai-2026': \[).*?(\],)", r"""\1
    {
      id: 'early-bird',
      name: 'Early Bird',
      price: 449,
      description: 'Full access to all sessions, networking events, and exhibition area.',
      features: ['Access to all keynote sessions', 'Networking lunches and coffee breaks', 'Event app access', 'Certificate of attendance'],
      recommended: false,
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 599,
      description: 'Standard access to all summit activities.',
      features: ['Access to all keynote sessions', 'Networking lunches and coffee breaks', 'Event app access', 'Certificate of attendance', 'Post-event recording access'],
      recommended: true,
    },
    {
      id: 'late',
      name: 'Late',
      price: 699,
      description: 'Late registration access.',
      features: ['Access to all keynote sessions', 'Networking lunches and coffee breaks', 'Event app access', 'Certificate of attendance', 'Post-event recording access'],
      recommended: false,
    },
  ],""", file, flags=re.DOTALL)

# Replace China Ticket Tiers
file = re.sub(r"('china-healthtech-2027': \[).*?(\],)", r"""\1
    {
      id: 'early-bird',
      name: 'Early Bird',
      price: 299,
      description: 'Full access to exhibition and networking events.',
      features: ['Exhibition floor access', 'B2B Matchmaking', 'Event app access', 'Welcome reception'],
      recommended: false,
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 399,
      description: 'Standard access for delegates.',
      features: ['Exhibition floor access', 'B2B Matchmaking', 'Event app access', 'Welcome reception', 'All conference tracks'],
      recommended: true,
    },
    {
      id: 'late',
      name: 'Late',
      price: 499,
      description: 'Late registration access.',
      features: ['Exhibition floor access', 'B2B Matchmaking', 'Event app access', 'Welcome reception', 'All conference tracks'],
      recommended: false,
    },
  ],""", file, flags=re.DOTALL)

with open('data/events.ts', 'w', encoding='utf-8') as f:
    f.write(file)
