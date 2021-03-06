var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Event = new keystone.List('Event');

Event.add({
	name: { type: Types.Text, initial: true, required: true},
    time: { type: Date, initial: true, required: true },
    image: {type : Types.CloudinaryImage , initial :true},
    price: {type: Types.Money, format: 'Rp 0.0,00' , initial: true ,required: true},
    participant_limit : {type: Types.Number, initial:true},
    description : { type: Types.Textarea, initial: true, required: true},
    location:{ type: Types.Location, defaults: { country: 'Indonesia' }}
});


/**
 * Registration
 */
Event.defaultColumns = 'name, time, price, participant_limit,description';
Event.register();
