var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
    password: { type: Types.Password, initial: true, required: true },
    first_name: {type : Types.Text, initial :true},
    last_name: {type: Types.Text, initial:true},
    address: {type: Types.Text, initial:true},
    phone_number: {type: Types.Number, initial:true},
    isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
    image: {type: Types.CloudinaryImage }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
User.defaultColumns = 'first_name, last_name, email, password, address, phone_number';
User.register();
