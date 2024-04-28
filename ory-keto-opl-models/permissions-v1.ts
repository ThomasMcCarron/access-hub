import { Namespace, Context } from "@ory/keto-namespace-types"

class User implements Namespace {}

class App implements Namespace {
  related: {
    developers: Developer[]
  }
}

class Developer implements Namespace {}

class Review implements Namespace {
  related: {
    editors: User[]
  }
}

class Role implements Namespace {}
