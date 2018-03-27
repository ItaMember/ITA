var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Event = new keystone.List('Event');

Event.add({
	name: { type: Types.Text, initial: true, required: true, unique: true},
    time: { type: Date, initial: true, required: true },
    image: {type : Types.CloudinaryImage , initial :true},
    price: {type: Types.Number, initial:true},
    participant: {type:  Types.Relationship, ref: 'User' ,  many: true},
    participant_limit : {type: Types.Number, initial:true}
});


/**
 * Registration
 */
Event.defaultColumns = 'name, last_timename, price, participant, participant_limit';
Event.register();
