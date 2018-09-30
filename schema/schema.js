const graphql = require('graphql');
const Bus = require('../models/bus');
const Passenger = require('../models/passenger')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const BusType = new GraphQLObjectType({
    name: 'Bus',
    fields: ( ) => ({
        id: { type: GraphQLID },
        date: { type: GraphQLString },
        time: { type: GraphQLString },
        route: { type: GraphQLString},
        description:  { type: GraphQLString},
        vehicle: { type: GraphQLString},
        passengers: {
            type: new GraphQLList(PassengerType),
            resolve(parent, args){
                return Passenger.find({ busId: parent.id });
            }
        }
    })
});

const PassengerType = new GraphQLObjectType({
    name: 'Passenger',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        seatNum: {type: GraphQLInt},
        busId: {type: GraphQLID}
    })
});
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        buses: {
            type: new GraphQLList(BusType),
            args: { date: { type: GraphQLString } },
            resolve(parent, args){
                return Bus.find({ date: args.date });
            }
        },
        bus: {
            type: BusType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args){
                return Bus.findById(args.id)
            }
        }
    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBus: {
            type: BusType,
            args: {
                date: { type: GraphQLString },
                time: { type: GraphQLString },
                route: { type: GraphQLString },
                vehicle: { type: GraphQLString },
                description: { type: GraphQLString }
            },
            resolve(parent, args){
                let bus = new Bus({
                    date: args.date,
                    time: args.time,
                    route: args.route,
                    vehicle: args.vehicle,
                    description: args.description
                });
                return bus.save();
            }
        },
        deleteBus: {
            type: BusType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args){
                return Bus.findByIdAndRemove(args.id)
            }
        },
        addPassenger: {
            type: PassengerType,
            args: {
                name: { type: GraphQLString },
                phone: { type: GraphQLString },
                seatNum: {type: GraphQLInt },
                busId: { type: GraphQLID }
            },
            resolve(parent, args){
                let passenger = new Passenger({
                    name: args.name,
                    phone: args.phone,
                    seatNum: args.seatNum,
                    busId: args.busId
                });
                return passenger.save();
            }
        },
        deletePassenger: {
            type: PassengerType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args){
                return Passenger.findByIdAndRemove(args.id)
            }
        },
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
