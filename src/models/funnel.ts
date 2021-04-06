import { VulcanDocument, VulcanSchema } from "@vulcanjs/schema";
import SimpleSchema from "simpl-schema";
import {
  buildDefaultMutationResolvers,
  buildDefaultQueryResolvers,
  createGraphqlModel,
  VulcanGraphqlModel,
} from "@vulcanjs/graphql";
import { createMongooseConnector } from "@vulcanjs/mongo";

export interface FunnelType extends VulcanDocument {
  steps?: Array<string>;
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
  steps: {
    type: Array,
    optional: true,
    //input: "checkboxgroup",
    canCreate: ["admins"],
    canUpdate: ["admins"],
    canRead: ["guests"],
    // TODO: allow to manage custom groups
    // form: {
    //   options: function () {
    //     const groups = _.without(
    //       _.keys(getCollection("Users").groups),
    //       "guests",
    //       "members",
    //       "owners",
    //       "admins"
    //     );
    //     return groups.map((group) => {
    //       return { value: group, label: group };
    //     });
    //   },
    // },
  },
  "steps.$": {
    type: String,
    optional: true,
  },
};

export const Funnel = createGraphqlModel({
  name: "Funnel",
  graphql: {
    typeName: "Funnel",
    multiTypeName: "Funnels",
    queryResolvers: buildDefaultQueryResolvers({ typeName: "Funnel" }),
    mutationResolvers: buildDefaultMutationResolvers({
      typeName: "Funnel",
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

export const FunnelConnector = createMongooseConnector<FunnelType>(Funnel);
