const facebook = [
  { text: 'Age', required: true, completed: false, requiredFields: ['ageMin', 'ageMax'] },
  { text: 'Gender', required: true, completed: false },
  { text: 'Location', required: true, completed: false },
  { text: 'Interests', required: false, completed: false },
];

export let platforms: { [platform: string]: any } = { facebook };

export function getPlatformTabsList(platform: string) {
  return platforms[platform];
}
