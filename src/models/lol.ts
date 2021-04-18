import { VulcanDocument, VulcanSchema } from "@vulcanjs/schema";
import SimpleSchema from "simpl-schema";
import {
  buildDefaultMutationResolvers,
  buildDefaultQueryResolvers,
  createGraphqlModel,
  VulcanGraphqlModel,
} from "@vulcanjs/graphql";
import { createMongooseConnector } from "@vulcanjs/mongo";

export interface Lol extends VulcanDocument {
  lol1: String;
  lol2: String;
}

const schema: VulcanSchema = {
  _id: {
    type: String,
    optional: true,
    canRead: ["guests"],
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ["admins"],
    onCreate: () => {
      return new Date();
    },
  },
  lol1: {
    type: String,
    optional: true,
    //input: "checkboxgroup",
    canCreate: ["admins"],
    canUpdate: ["admins"],
    canRead: ["guests"],
  },
  lol2: {
    type: String,
    optional: true,
    //input: "checkboxgroup",
    canCreate: ["admins"],
    canUpdate: ["admins"],
    canRead: ["guests"],
  }
};

export const Lol = createGraphqlModel({
  name: "Lol",
  graphql: {
    typeName: "Lol",
    multiTypeName: "Lols",
    queryResolvers: buildDefaultQueryResolvers({ typeName: "Lol" }),
    mutationResolvers: buildDefaultMutationResolvers({
      typeName: "Lol",
    }),
  },
  schema,
  permissions: {
    canCreate: ["guests"],
    canUpdate: ["owners", "admins"],
    canDelete: ["owners", "admins"],
    canRead: ["members", "admins"],
  },
}) as VulcanGraphqlModel;

export const LolConnector = createMongooseConnector<LolType>(Lol);
