import * as Types from '../graphql.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddUrlMutationVariables = Types.Exact<{
  origin: Types.Scalars['String'];
}>;


export type AddUrlMutation = { __typename?: 'Mutation', url: { __typename?: 'UrlDto', token: string, origin: string } };


export const AddUrlDocument = gql`
    mutation addUrl($origin: String!) {
  url(origin: $origin) {
    token
    origin
  }
}
    `;
export function useAddUrlMutation(baseOptions?: Apollo.MutationHookOptions<AddUrlMutation, AddUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUrlMutation, AddUrlMutationVariables>(AddUrlDocument, options);
      }
export type AddUrlMutationHookResult = ReturnType<typeof useAddUrlMutation>;
export type AddUrlMutationResult = Apollo.MutationResult<AddUrlMutation>;
export type AddUrlMutationOptions = Apollo.BaseMutationOptions<AddUrlMutation, AddUrlMutationVariables>;