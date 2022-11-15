import axios from "axios";

const getData = async () => {
  try {
    const data = await axios
      .get("http://127.0.0.1:5000/")
      .then((res: any) => console.log(res))
      .catch((err: any) => console.log({ err: err?.message }));
    return data;
  } catch (error) {
    return "error";
  }
};

export default async function Page() {
  const fetchedData = await getData();

  console.log({ fetchedData });
  return <div>Hello World</div>;
}
