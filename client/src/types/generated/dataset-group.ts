/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * DOCUMENTATION
 * OpenAPI spec version: 1.0.0
 */
import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  QueryKey,
} from '@tanstack/react-query';
import type {
  DatasetGroupListResponse,
  Error,
  GetDatasetGroupsParams,
  DatasetGroupResponse,
  DatasetGroupRequest,
  GetDatasetGroupsIdParams,
} from './strapi.schemas';
import { API } from '../../services/api/index';
import type { ErrorType } from '../../services/api/index';

export const getDatasetGroups = (params?: GetDatasetGroupsParams, signal?: AbortSignal) => {
  return API<DatasetGroupListResponse>({ url: `/dataset-groups`, method: 'get', params, signal });
};

export const getGetDatasetGroupsQueryKey = (params?: GetDatasetGroupsParams) =>
  [`/dataset-groups`, ...(params ? [params] : [])] as const;

export const getGetDatasetGroupsQueryOptions = <
  TData = Awaited<ReturnType<typeof getDatasetGroups>>,
  TError = ErrorType<Error>,
>(
  params?: GetDatasetGroupsParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDatasetGroups>>, TError, TData>;
  },
): UseQueryOptions<Awaited<ReturnType<typeof getDatasetGroups>>, TError, TData> & {
  queryKey: QueryKey;
} => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetDatasetGroupsQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getDatasetGroups>>> = ({ signal }) =>
    getDatasetGroups(params, signal);

  return { queryKey, queryFn, ...queryOptions };
};

export type GetDatasetGroupsQueryResult = NonNullable<Awaited<ReturnType<typeof getDatasetGroups>>>;
export type GetDatasetGroupsQueryError = ErrorType<Error>;

export const useGetDatasetGroups = <
  TData = Awaited<ReturnType<typeof getDatasetGroups>>,
  TError = ErrorType<Error>,
>(
  params?: GetDatasetGroupsParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDatasetGroups>>, TError, TData>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetDatasetGroupsQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const postDatasetGroups = (datasetGroupRequest: DatasetGroupRequest) => {
  return API<DatasetGroupResponse>({
    url: `/dataset-groups`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: datasetGroupRequest,
  });
};

export const getPostDatasetGroupsMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postDatasetGroups>>,
    TError,
    { data: DatasetGroupRequest },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postDatasetGroups>>,
  TError,
  { data: DatasetGroupRequest },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postDatasetGroups>>,
    { data: DatasetGroupRequest }
  > = (props) => {
    const { data } = props ?? {};

    return postDatasetGroups(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostDatasetGroupsMutationResult = NonNullable<
  Awaited<ReturnType<typeof postDatasetGroups>>
>;
export type PostDatasetGroupsMutationBody = DatasetGroupRequest;
export type PostDatasetGroupsMutationError = ErrorType<Error>;

export const usePostDatasetGroups = <TError = ErrorType<Error>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postDatasetGroups>>,
    TError,
    { data: DatasetGroupRequest },
    TContext
  >;
}) => {
  const mutationOptions = getPostDatasetGroupsMutationOptions(options);

  return useMutation(mutationOptions);
};
export const getDatasetGroupsId = (
  id: number,
  params?: GetDatasetGroupsIdParams,
  signal?: AbortSignal,
) => {
  return API<DatasetGroupResponse>({ url: `/dataset-groups/${id}`, method: 'get', params, signal });
};

export const getGetDatasetGroupsIdQueryKey = (id: number, params?: GetDatasetGroupsIdParams) =>
  [`/dataset-groups/${id}`, ...(params ? [params] : [])] as const;

export const getGetDatasetGroupsIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getDatasetGroupsId>>,
  TError = ErrorType<Error>,
>(
  id: number,
  params?: GetDatasetGroupsIdParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDatasetGroupsId>>, TError, TData>;
  },
): UseQueryOptions<Awaited<ReturnType<typeof getDatasetGroupsId>>, TError, TData> & {
  queryKey: QueryKey;
} => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetDatasetGroupsIdQueryKey(id, params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getDatasetGroupsId>>> = ({ signal }) =>
    getDatasetGroupsId(id, params, signal);

  return { queryKey, queryFn, enabled: !!id, ...queryOptions };
};

export type GetDatasetGroupsIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getDatasetGroupsId>>
>;
export type GetDatasetGroupsIdQueryError = ErrorType<Error>;

export const useGetDatasetGroupsId = <
  TData = Awaited<ReturnType<typeof getDatasetGroupsId>>,
  TError = ErrorType<Error>,
>(
  id: number,
  params?: GetDatasetGroupsIdParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDatasetGroupsId>>, TError, TData>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetDatasetGroupsIdQueryOptions(id, params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const putDatasetGroupsId = (id: number, datasetGroupRequest: DatasetGroupRequest) => {
  return API<DatasetGroupResponse>({
    url: `/dataset-groups/${id}`,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: datasetGroupRequest,
  });
};

export const getPutDatasetGroupsIdMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putDatasetGroupsId>>,
    TError,
    { id: number; data: DatasetGroupRequest },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof putDatasetGroupsId>>,
  TError,
  { id: number; data: DatasetGroupRequest },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof putDatasetGroupsId>>,
    { id: number; data: DatasetGroupRequest }
  > = (props) => {
    const { id, data } = props ?? {};

    return putDatasetGroupsId(id, data);
  };

  return { mutationFn, ...mutationOptions };
};

export type PutDatasetGroupsIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof putDatasetGroupsId>>
>;
export type PutDatasetGroupsIdMutationBody = DatasetGroupRequest;
export type PutDatasetGroupsIdMutationError = ErrorType<Error>;

export const usePutDatasetGroupsId = <TError = ErrorType<Error>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putDatasetGroupsId>>,
    TError,
    { id: number; data: DatasetGroupRequest },
    TContext
  >;
}) => {
  const mutationOptions = getPutDatasetGroupsIdMutationOptions(options);

  return useMutation(mutationOptions);
};
export const deleteDatasetGroupsId = (id: number) => {
  return API<number>({ url: `/dataset-groups/${id}`, method: 'delete' });
};

export const getDeleteDatasetGroupsIdMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteDatasetGroupsId>>,
    TError,
    { id: number },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteDatasetGroupsId>>,
  TError,
  { id: number },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteDatasetGroupsId>>,
    { id: number }
  > = (props) => {
    const { id } = props ?? {};

    return deleteDatasetGroupsId(id);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteDatasetGroupsIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteDatasetGroupsId>>
>;

export type DeleteDatasetGroupsIdMutationError = ErrorType<Error>;

export const useDeleteDatasetGroupsId = <TError = ErrorType<Error>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteDatasetGroupsId>>,
    TError,
    { id: number },
    TContext
  >;
}) => {
  const mutationOptions = getDeleteDatasetGroupsIdMutationOptions(options);

  return useMutation(mutationOptions);
};
