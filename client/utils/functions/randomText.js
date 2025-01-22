export default function getRandomString(textLength) {
  const randomValue = "abcdefghijklmnopqrstuvwxyz";
  // const randomValue = randomChars || '`"!@#$%^&*()_+=-[]{}/|\,.\;:<>?1234567890abcdefghijklmnopqrstuvwxyz';
  let result = "";
  for (let i = 0; i < textLength; i++) {
    result += randomValue.charAt(
      Math.floor(Math.random() * randomValue.length)
    );
  }
  return result;
}
