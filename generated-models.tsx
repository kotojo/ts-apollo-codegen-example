/* tslint:disable */
import { GraphQLResolveInfo } from "graphql";

export type Resolver<Result, Parent = any, Context = any, Args = any> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export type SubscriptionResolver<
  Result,
  Parent = any,
  Context = any,
  Args = any
> = {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
};

export interface Query {
  hobby: Hobby;
  hobbies: (Hobby | null)[];
  person: Person;
  people: (Person | null)[];
}

export interface Hobby {
  id: string;
  name: string;
  description?: string | null;
}

export interface Person {
  id: string;
  name: string;
  age: number;
  hobbies: (Hobby | null)[];
}

export interface Mutation {
  updatePerson: Person;
}
export interface HobbyQueryArgs {
  id: number;
}
export interface PersonQueryArgs {
  id: number;
}
export interface UpdatePersonMutationArgs {
  id: number;
  age: number;
}

export namespace QueryResolvers {
  export interface Resolvers<Context = any> {
    hobby?: HobbyResolver<Hobby, any, Context>;
    hobbies?: HobbiesResolver<(Hobby | null)[], any, Context>;
    person?: PersonResolver<Person, any, Context>;
    people?: PeopleResolver<(Person | null)[], any, Context>;
  }

  export type HobbyResolver<R = Hobby, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context,
    HobbyArgs
  >;
  export interface HobbyArgs {
    id: number;
  }

  export type HobbiesResolver<
    R = (Hobby | null)[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PersonResolver<
    R = Person,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, PersonArgs>;
  export interface PersonArgs {
    id: number;
  }

  export type PeopleResolver<
    R = (Person | null)[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace HobbyResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    name?: NameResolver<string, any, Context>;
    description?: DescriptionResolver<string | null, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type DescriptionResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace PersonResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    name?: NameResolver<string, any, Context>;
    age?: AgeResolver<number, any, Context>;
    hobbies?: HobbiesResolver<(Hobby | null)[], any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type AgeResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type HobbiesResolver<
    R = (Hobby | null)[],
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = any> {
    updatePerson?: UpdatePersonResolver<Person, any, Context>;
  }

  export type UpdatePersonResolver<
    R = Person,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpdatePersonArgs>;
  export interface UpdatePersonArgs {
    id: number;
    age: number;
  }
}

export namespace DashboardQuery {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    people: (People | null)[];
  };

  export type People = {
    __typename?: "Person";
    id: string;
    name: string;
  };
}

export namespace PersonQuery {
  export type Variables = {
    id: number;
  };

  export type Query = {
    __typename?: "Query";
    person: Person;
  };

  export type Person = {
    __typename?: "Person";
    id: string;
    name: string;
    age: number;
    hobbies: (Hobbies | null)[];
  };

  export type Hobbies = {
    __typename?: "Hobby";
    id: string;
    name: string;
    description?: string | null;
  };
}

export namespace UpdatePerson {
  export type Variables = {
    id: number;
    age: number;
  };

  export type Mutation = {
    __typename?: "Mutation";
    updatePerson: UpdatePerson;
  };

  export type UpdatePerson = {
    __typename?: "Person";
    id: string;
  };
}

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

export namespace DashboardQuery {
  export const Document = gql`
    query DashboardQuery {
      people {
        id
        name
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...this.props as any}
        />
      );
    }
  }
  export function HOC<TProps = {}>(
    operationOptions?: ReactApollo.OperationOption<TProps, Query, Variables>
  ) {
    return ReactApollo.graphql<TProps, Query, Variables>(
      Document,
      operationOptions
    );
  }
}
export namespace PersonQuery {
  export const Document = gql`
    query PersonQuery($id: Int!) {
      person(id: $id) {
        id
        name
        age
        hobbies {
          id
          name
          description
        }
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...this.props as any}
        />
      );
    }
  }
  export function HOC<TProps = {}>(
    operationOptions?: ReactApollo.OperationOption<TProps, Query, Variables>
  ) {
    return ReactApollo.graphql<TProps, Query, Variables>(
      Document,
      operationOptions
    );
  }
}
export namespace UpdatePerson {
  export const Document = gql`
    mutation UpdatePerson($id: Int!, $age: Int!) {
      updatePerson(id: $id, age: $age) {
        id
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...this.props as any}
        />
      );
    }
  }
  export function HOC<TProps = {}>(
    operationOptions?: ReactApollo.OperationOption<TProps, Mutation, Variables>
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables>(
      Document,
      operationOptions
    );
  }
}
