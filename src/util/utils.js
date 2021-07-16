const sysMsgBase = {
  sender: 'System',
  createdAt: new Date().toLocaleTimeString()
};

export const sysMsgs = {
  base: {
    sender: 'System',
    createdAt: new Date().toLocaleTimeString()
  },
  welcome: {
    ...sysMsgBase,
    text: 'Welcome to the lobby.'
  }
};

// import Haikunator from 'haikunator';

// const adjectives = [
//   'aged', 'ancient', 'billowing', 'bitter', 'black', 'blue', 'broad', 'broken', 'calm', 'cold', 'crimson', 'damp', 'dark', 'delicate', 'dry', 'floral', 'gentle', 'green', 'hidden', 'holy', 'frigid', 'vast', 'transient', 'lingering', 'lucky', 'misty', 'nameless', 'old', 'great', 'patient', 'polished', 'proud', 'purple', 'quiet', 'red', 'restless', 'rough', 'royal', 'shining', 'silent', 'snowy', 'desolate', 'lonely', 'foggy', 'still', 'summer', 'twilight', 'wandering', 'weathered', 'white', 'winter', 'yellow', 'scenic', 'foul', 'shady'
// ];

// const nouns = [
//   'hillock', 'delve', 'sandbar', 'reef', 'camp', 'village', 'alley', 'canyon', 'gully', 'gulf', 'brook', 'bush', 'passage', 'keep', 'tower', 'bridge', 'beach', 'bay', 'hollow', 'dream', 'planet', 'heights', 'field', 'ruins', 'wall', 'garden', 'park', 'forest', 'depot', 'oasis', 'glade', 'hall', 'castle', 'fort', 'hill', 'lake', 'inlet', 'marsh', 'swamp', 'meadow', 'homestead', 'dock', 'mountain', 'peak', 'ocean', 'shoal', 'palace', 'office', 'barrens', 'pond', 'temple', 'way', 'island', 'river', 'farm', 'workshop', 'sea', 'villa', 'factory', 'waterfall', 'harbor', 'monolith', 'rapids', 'wood'
// ];

// export const hk = new Haikunator({
//   adjectives: adjectives,
//   nouns: nouns,
//   defaults: {
//       delimiter: "-",
//       tokenLength: 4,
//       tokenHex: false,
//       tokenChars: "0123456789",
//   }
// })