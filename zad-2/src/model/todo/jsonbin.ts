import jQuery from "jquery";
import { type TodoItem } from "@/types.ts";

const JSONBIN_URL = import.meta.env.VITE_JSONBIN_URL as string;
const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY as string;

type JSONBinResponse = {
  record: TodoItem[];
  metadata: Metadata;
};

type Metadata = {
  id: string;
  private: boolean;
  createdAt: string;
};

export class JSONBin {
  static async load(): Promise<TodoItem[] | null> {
    let resData: JSONBinResponse["record"] | null = null;

    await jQuery.ajax({
      url: JSONBIN_URL,
      type: "GET",
      headers: {
        "X-ACCESS-KEY": ACCESS_KEY,
      },
      success: (data: JSONBinResponse) => {
        resData = data.record;
      },
      error: (err) => {
        console.error(err);
      },
    });

    return resData;
  }

  static async save(data: TodoItem[]) {
    // JSONBin requires the JSON to be non-empty
    const uploadData = data.length > 0 ? data : [null];

    await jQuery.ajax({
      url: JSONBIN_URL,
      type: "PUT",
      headers: {
        "X-ACCESS-KEY": ACCESS_KEY,
      },
      contentType: "application/json",
      data: JSON.stringify(uploadData),
      success: (data) => {
        console.log("put:success", data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
