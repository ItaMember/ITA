var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Booking = new keystone.List('Booking');

Booking.add({
	user: { type: Types.Relationship, ref:'User'},
    event: { type: Types.Relationship, ref:'Event' },
    status: { type: Types.Select, options: 'open,booked, purchased', default: 'open'}
});


/**
 * Registration
 */
Booking.defaultColumns = 'name, time, price, participant_limit,description';
Booking.register();
