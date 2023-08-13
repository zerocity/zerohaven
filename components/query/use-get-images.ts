import { isNil, omitBy } from "lodash";
import {
  ApiResponse,
  GetImageParameter,
  ImageReturn,
} from "./use-get-images.types";
import { useQuery } from "@tanstack/react-query";

async function fetchGetImages(_: unknown, param: Partial<GetImageParameter>) {
  const query = new URLSearchParams({
    ...param,
  });
  const url = `${"https://wallhaven.cc/api/v1/search"}?${query}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = (await response.json()) as ApiResponse;
  return data.data;
}

export function useGetImages(param: GetImageParameter) {
  const filterParams = omitBy(param, isNil);
  const result = useQuery<ImageReturn[]>(
    ["search", filterParams],
    (others: unknown) => {
      return fetchGetImages(others, filterParams);
    }
  );
  return result;
}
