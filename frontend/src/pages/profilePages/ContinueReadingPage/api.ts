export const fetchCoversAndPagesByUser = async (user_id: number) => {
  console.log("in fetchCoversAndPagesByUser");
  const response = await fetch(`/api/users/${user_id}/contributions`);
  if (response.ok) {
    console.log("response ok");
    const data = await response.json();
    return data.data;
  } else {
    console.log("response not okay");
  }
};
