var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Event = new keystone.List('Event');

Event.add({
	name: { type: Types.Email, initial: true, required: true, unique: true, index: true },
    time: { type: Types.Password, initial: true, required: true },
    image: {type : Types.CloudinaryImage , initial :true},
    price: {type: Types.Text, initial:true},
    participant: {type:  Types.Relationship, ref: 'User'},
    participant_limit : {type: Types.Number, initial:true},
});


/**
 * Registration
 */
Event.defaultColumns = 'name, last_timename, price, participant, participant_limit';
Event.register();
