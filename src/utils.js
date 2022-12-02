export const cssTransform = (arrayOfClasses, styles) => {
   if (!arrayOfClasses || !styles) return;

   return arrayOfClasses
   .filter(className => className)
   .map(className => styles[className])
   .join(' ');
};

export const createUUID = () => {
   return (String(1e7) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => {
      return (
         Number(c) ^
         (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))
      ).toString(16)
   });
}
