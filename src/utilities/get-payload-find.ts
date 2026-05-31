import { getPayload } from "@/utilities/get-payload";

export const getPayloadFind = async (args: any) => {
  const payload = await getPayload();
  return payload.find(args);
};
