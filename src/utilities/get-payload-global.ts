import { getPayload } from "@/utilities/get-payload";

export const getPayloadGlobal = async (args: any) => {
  const payload = await getPayload();
  return payload.findGlobal(args);
};
