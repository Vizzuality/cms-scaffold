/**
 * Generated by orval v6.16.0 🍺
 * Do not edit manually.
 * DOCUMENTATION
 * OpenAPI spec version: 1.0.0
 */
import { useQuery, useInfiniteQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  UseInfiniteQueryResult,
  QueryKey,
} from '@tanstack/react-query';

import { API } from '../../services/api/index';
import type { ErrorType } from '../../services/api/index';

import type {
  MapboxLayerListResponse,
  Error,
  GetMapboxLayersParams,
  MapboxLayerResponse,
  MapboxLayerRequest,
} from './strapi.schemas';

export const getMapboxLayers = (params?: GetMapboxLayersParams, signal?: AbortSignal) => {
  return API<MapboxLayerListResponse>({ url: `/mapbox-layers`, method: 'get', params, signal });
};

export const getGetMapboxLayersQueryKey = (params?: GetMapboxLayersParams) =>
  [`/mapbox-layers`, ...(params ? [params] : [])] as const;

export const getGetMapboxLayersInfiniteQueryOptions = <
  TData = Awaited<ReturnType<typeof getMapboxLayers>>,
  TError = ErrorType<Error>
>(
  params?: GetMapboxLayersParams,
  options?: {
    query?: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getMapboxLayers>>, TError, TData>;
  }
): UseInfiniteQueryOptions<Awaited<ReturnType<typeof getMapboxLayers>>, TError, TData> & {
  queryKey: QueryKey;
} => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetMapboxLayersQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getMapboxLayers>>> = ({
    signal,
    pageParam,
  }) => getMapboxLayers({ 'pagination[page]': pageParam, ...params }, signal);

  return { queryKey, queryFn, staleTime: 10000, ...queryOptions };
};

export type GetMapboxLayersInfiniteQueryResult = NonNullable<
  Awaited<ReturnType<typeof getMapboxLayers>>
>;
export type GetMapboxLayersInfiniteQueryError = ErrorType<Error>;

export const useGetMapboxLayersInfinite = <
  TData = Awaited<ReturnType<typeof getMapboxLayers>>,
  TError = ErrorType<Error>
>(
  params?: GetMapboxLayersParams,
  options?: {
    query?: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getMapboxLayers>>, TError, TData>;
  }
): UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetMapboxLayersInfiniteQueryOptions(params, options);

  const query = useInfiniteQuery(queryOptions) as UseInfiniteQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const getGetMapboxLayersQueryOptions = <
  TData = Awaited<ReturnType<typeof getMapboxLayers>>,
  TError = ErrorType<Error>
>(
  params?: GetMapboxLayersParams,
  options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getMapboxLayers>>, TError, TData> }
): UseQueryOptions<Awaited<ReturnType<typeof getMapboxLayers>>, TError, TData> & {
  queryKey: QueryKey;
} => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetMapboxLayersQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getMapboxLayers>>> = ({ signal }) =>
    getMapboxLayers(params, signal);

  return { queryKey, queryFn, staleTime: 10000, ...queryOptions };
};

export type GetMapboxLayersQueryResult = NonNullable<Awaited<ReturnType<typeof getMapboxLayers>>>;
export type GetMapboxLayersQueryError = ErrorType<Error>;

export const useGetMapboxLayers = <
  TData = Awaited<ReturnType<typeof getMapboxLayers>>,
  TError = ErrorType<Error>
>(
  params?: GetMapboxLayersParams,
  options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getMapboxLayers>>, TError, TData> }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetMapboxLayersQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const postMapboxLayers = (mapboxLayerRequest: MapboxLayerRequest) => {
  return API<MapboxLayerResponse>({
    url: `/mapbox-layers`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: mapboxLayerRequest,
  });
};

export const getPostMapboxLayersMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postMapboxLayers>>,
    TError,
    { data: MapboxLayerRequest },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postMapboxLayers>>,
  TError,
  { data: MapboxLayerRequest },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postMapboxLayers>>,
    { data: MapboxLayerRequest }
  > = (props) => {
    const { data } = props ?? {};

    return postMapboxLayers(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostMapboxLayersMutationResult = NonNullable<
  Awaited<ReturnType<typeof postMapboxLayers>>
>;
export type PostMapboxLayersMutationBody = MapboxLayerRequest;
export type PostMapboxLayersMutationError = ErrorType<Error>;

export const usePostMapboxLayers = <TError = ErrorType<Error>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postMapboxLayers>>,
    TError,
    { data: MapboxLayerRequest },
    TContext
  >;
}) => {
  const mutationOptions = getPostMapboxLayersMutationOptions(options);

  return useMutation(mutationOptions);
};
export const getMapboxLayersId = (id: number, signal?: AbortSignal) => {
  return API<MapboxLayerResponse>({ url: `/mapbox-layers/${id}`, method: 'get', signal });
};

export const getGetMapboxLayersIdQueryKey = (id: number) => [`/mapbox-layers/${id}`] as const;

export const getGetMapboxLayersIdInfiniteQueryOptions = <
  TData = Awaited<ReturnType<typeof getMapboxLayersId>>,
  TError = ErrorType<Error>
>(
  id: number,
  options?: {
    query?: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getMapboxLayersId>>, TError, TData>;
  }
): UseInfiniteQueryOptions<Awaited<ReturnType<typeof getMapboxLayersId>>, TError, TData> & {
  queryKey: QueryKey;
} => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetMapboxLayersIdQueryKey(id);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getMapboxLayersId>>> = ({ signal }) =>
    getMapboxLayersId(id, signal);

  return { queryKey, queryFn, enabled: !!id, staleTime: 10000, ...queryOptions };
};

export type GetMapboxLayersIdInfiniteQueryResult = NonNullable<
  Awaited<ReturnType<typeof getMapboxLayersId>>
>;
export type GetMapboxLayersIdInfiniteQueryError = ErrorType<Error>;

export const useGetMapboxLayersIdInfinite = <
  TData = Awaited<ReturnType<typeof getMapboxLayersId>>,
  TError = ErrorType<Error>
>(
  id: number,
  options?: {
    query?: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getMapboxLayersId>>, TError, TData>;
  }
): UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetMapboxLayersIdInfiniteQueryOptions(id, options);

  const query = useInfiniteQuery(queryOptions) as UseInfiniteQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const getGetMapboxLayersIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getMapboxLayersId>>,
  TError = ErrorType<Error>
>(
  id: number,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMapboxLayersId>>, TError, TData>;
  }
): UseQueryOptions<Awaited<ReturnType<typeof getMapboxLayersId>>, TError, TData> & {
  queryKey: QueryKey;
} => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetMapboxLayersIdQueryKey(id);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getMapboxLayersId>>> = ({ signal }) =>
    getMapboxLayersId(id, signal);

  return { queryKey, queryFn, enabled: !!id, staleTime: 10000, ...queryOptions };
};

export type GetMapboxLayersIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getMapboxLayersId>>
>;
export type GetMapboxLayersIdQueryError = ErrorType<Error>;

export const useGetMapboxLayersId = <
  TData = Awaited<ReturnType<typeof getMapboxLayersId>>,
  TError = ErrorType<Error>
>(
  id: number,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMapboxLayersId>>, TError, TData>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetMapboxLayersIdQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const putMapboxLayersId = (id: number, mapboxLayerRequest: MapboxLayerRequest) => {
  return API<MapboxLayerResponse>({
    url: `/mapbox-layers/${id}`,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: mapboxLayerRequest,
  });
};

export const getPutMapboxLayersIdMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putMapboxLayersId>>,
    TError,
    { id: number; data: MapboxLayerRequest },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof putMapboxLayersId>>,
  TError,
  { id: number; data: MapboxLayerRequest },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof putMapboxLayersId>>,
    { id: number; data: MapboxLayerRequest }
  > = (props) => {
    const { id, data } = props ?? {};

    return putMapboxLayersId(id, data);
  };

  return { mutationFn, ...mutationOptions };
};

export type PutMapboxLayersIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof putMapboxLayersId>>
>;
export type PutMapboxLayersIdMutationBody = MapboxLayerRequest;
export type PutMapboxLayersIdMutationError = ErrorType<Error>;

export const usePutMapboxLayersId = <TError = ErrorType<Error>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putMapboxLayersId>>,
    TError,
    { id: number; data: MapboxLayerRequest },
    TContext
  >;
}) => {
  const mutationOptions = getPutMapboxLayersIdMutationOptions(options);

  return useMutation(mutationOptions);
};
export const deleteMapboxLayersId = (id: number) => {
  return API<number>({ url: `/mapbox-layers/${id}`, method: 'delete' });
};

export const getDeleteMapboxLayersIdMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteMapboxLayersId>>,
    TError,
    { id: number },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteMapboxLayersId>>,
  TError,
  { id: number },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteMapboxLayersId>>,
    { id: number }
  > = (props) => {
    const { id } = props ?? {};

    return deleteMapboxLayersId(id);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteMapboxLayersIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteMapboxLayersId>>
>;

export type DeleteMapboxLayersIdMutationError = ErrorType<Error>;

export const useDeleteMapboxLayersId = <TError = ErrorType<Error>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteMapboxLayersId>>,
    TError,
    { id: number },
    TContext
  >;
}) => {
  const mutationOptions = getDeleteMapboxLayersIdMutationOptions(options);

  return useMutation(mutationOptions);
};
