const { gql } = require('apollo-server-express');

module.exports = gql`

extend type Query {
  "Finds a single customer by customer ID."
  customerById(input: CustomerByIdQueryInput!): Customer!
  "Finds a single customer by encrypted customer ID."
  customerByEncyptedId(input: CustomerByEncryptedIdQueryInput!): Customer!
}

type Customer {
  id: Int! @value
  readerId: String @value
  encryptedCustomerId: String! @value
  salutation: String @value
  firstName: String @value
  middleName: String @value
  lastName: String @value
  suffix: String @value
  title: String @value
  gender: String @value
  promoCode: String @value
  signUpDate: Date @value
  changedDate: Date @value
  statusCode: CustomerStatusCode @codeOrType(instance: "CustomerStatusCode")
  mergeCode: CustomerMergeCode! @codeOrType(instance: "CustomerMergeCode")

  postalAddresses: [CustomerPostalAddress!]!
}

type CustomerPostalAddress {
  id: Int! @value
  addressContactType: PostalAddressContactType @codeOrType(instance: "AddressContactType")
  company: String @value
  street: String @value
  apartmentMailStop: String @value
  extraAddress: String @value
  city: String @value
  regionCode: String @value
  region: String @value
  postalCode: String @value
  countryCode: String @value
  country: String @value
  changedDate: Date! @value
  statusCode: PostalAddressStatusCode! @codeOrType(instance: "AddressStatusCode")
}

input CustomerByIdQueryInput {
  "The customer ID to lookup."
  id: Int!
  "Whether to fetch the newly activated customer if the provided ID is inactive."
  reQueryOnInactive: Boolean = true
}

input CustomerByEncryptedIdQueryInput {
  "The encrypted customer ID to lookup."
  id: String!
}

`;