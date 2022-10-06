import Property from 'src/app/interfaces/Property';
import SVGTag from 'src/app/interfaces/SVGTag';

export const getTagsFromTokens = (tagsTokens: any[]): SVGTag[] => {
  let tags: SVGTag[] = [];

  console.log(tagsTokens)

  for (let i = 0; i < tagsTokens.length; i++) {
    const currentTagTokens = tagsTokens[i];
    const tag = {
      name: currentTagTokens[0],
      properties: getPropertiesFromTokens(currentTagTokens),
    };

    if (tag.name == "style") {
      let inner: Property = {name: "inner", value: tagsTokens[i+1][0]} 
      tag.properties.push(inner);
      i++;
    }
    tags.push(tag); 
  }

  console.log("tags", tags)
  return tags;
};

const getPropertiesFromTokens = (tagTokens: any) => {
  let properties: Property[] = [];

  tagTokens.forEach((token: string, index: number) => {
    if (token != '=') return;

    const property = {
      name: tagTokens[index - 1],
      value: tagTokens[index + 1],
    };
    properties.push(property);
  });

  return properties;
};
