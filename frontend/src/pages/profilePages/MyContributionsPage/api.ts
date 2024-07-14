export const fetchCoversAndPagesByUser = async (user_id: number) => {
  const testBody = { user_id };
  const response = await fetch("/api/my-contributions", {
    method: "POST",
    headers: {},
    body: JSON.stringify(testBody),
  });
  if (response.ok) {
    const data = await response.json();
    return data.data;
  }
};
