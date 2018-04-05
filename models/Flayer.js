var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Flayer = new keystone.List('Flayer');

Flayer.add({
	name: { type: Types.Text, initial: true, required: true, unique: true},
    expired : { type: Date, initial: true, required: true },
    image: {type : Types.CloudinaryImage , initial :true},
    location:{ type: Types.Location, defaults: { country: 'Indonesia' }}
});


/**
 * Registration
 */
Flayer.defaultColumns = 'name, expired, image';
Flayer.register();
