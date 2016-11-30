var mongoose = require('mongoose');
var mysql = require('mysql');
var libBooks = mongoose.Schema({
    Name : String,
    Author : String,
    Status : String,
},{ "strict": false });
var libUser = mongoose.Schema({
    username : String,
    email : String,
    name : String,
    contact : Number,
    password : String,
    user_type : Number
},{ "strict": false });
var libTransct = mongoose.Schema({
    user_id :{ type:  mongoose.Schema.Types.ObjectId, ref: 'lib_Users' },
    book_id :{ type:  mongoose.Schema.Types.ObjectId, ref: 'lib_Books' },
    dueDate: Date,
    status: String,
},{ "strict": false });

module.exports.libraryBooks = mongoose.model('lib_Books', libBooks);
module.exports.libraryUser = mongoose.model('lib_Users', libUser);
module.exports.libraryTransct = mongoose.model('lib_Transcts',libTransct);
var InventryLineItemSchema = mongoose.Schema({
    Name:String,
    master_object_id :{ type:  mongoose.Schema.Types.ObjectId, ref: 'inventory_master_tables' },
    RecordTypeName:String,
    Location__c:String,
    Total_Area_in_Sq_Ft__c:Number,
    master_line_id:String,
    Co_ordinates__Latitude__s:Number,
    Co_ordinates__Longitude__s:Number,
    cordinateCombination : Array,
    Type_of_Transaction__c : String,
    publish : Number
});

InventryLineItemSchema.index({ cordinateCombination: '2d' });
var DataDetailsSchema = mongoose.Schema({});

var SalesforceSchema = mongoose.Schema({
    companyname: String,
    email: String,
    phone: String,
    inventory_master_lineitems_id:{ type:  mongoose.Schema.Types.ObjectId, ref: 'inventory_master_line_item_tables' },
    area: Number,
    prefferedlocation: String,
    query: String
});

var MasterTableSchema = mongoose.Schema({});

var UsersSchema =mongoose.Schema({ 
    username : String,
    email : String, 
    password : String
});

var AnalyticsSchema =mongoose.Schema({ 
    mongo_id : String,
    clickcount : Number, 
    hovercount : Number,
    shortlistcount : Number
});

var SectionSevenSchema = mongoose.Schema({});

var OfferImagesSchema = mongoose.Schema({});

var SectionSixSchema = mongoose.Schema({});

var SettingsSchema = mongoose.Schema({});

var SectionFourSchema = mongoose.Schema({});

var SectionFiveSchema = mongoose.Schema({});

var SectionStatusSchema = mongoose.Schema({});

var RentSectionStatusSchema = mongoose.Schema({});

var BuySectionStatusSchema = mongoose.Schema({});

var UserModelSchema = mongoose.Schema({
	userid:String,
	username:String,
	useremail:String
});

var SiteViewersSchema = mongoose.Schema({

    first_name : String,
    last_name : String,
    company_name : String,
    username : String,
    password : String,
    mobile : String,
    socail_sharing : String,
    active_status : Number,
    temp_pass : Number,
    user_type : Number,
    email_verify : String,
    modified : Date,
    created : Date

});

var UserShortlistSchema = mongoose.Schema({
    username:String,
    type :String,
    master_object_id:{ type:  mongoose.Schema.Types.ObjectId, ref: 'inventory_master_line_item_tables' }

});

var UserCompareSchema = mongoose.Schema({
    userid:String,
    proprtyType:String,
    master_object_id:{ type:  mongoose.Schema.Types.ObjectId, ref: 'inventory_master_line_item_tables' }

});

var PropertyAddressSchema = mongoose.Schema({});

var RecentSearchSchema =mongoose.Schema({ 
    location : String,
    category : String, 
    typeofspaceArray :  Array,
    floorperference : String,
    statusArray : Array,
    saletypeArray :  Array,
    area : String,
    work : String,
    userid : String,
    created : { type: Date, default: Date.now }
});

var PropertyAddressSchemaLatlong=mongoose.Schema({
    address : String,
    pathCoordinates : Array
})
module.exports.getLocationString = mongoose.model('property_addresses', PropertyAddressSchema);

module.exports.Locationlatlong = mongoose.model('property_addresses_latlong', PropertyAddressSchemaLatlong);

module.exports.inventryLineItem = mongoose.model('inventory_master_line_item_tables', InventryLineItemSchema);

module.exports.inventryMasterTable = mongoose.model('inventory_master_tables', MasterTableSchema);

module.exports.users = mongoose.model('users', UsersSchema);

module.exports.userModel = mongoose.model('user_model', UserModelSchema);

module.exports.homePageSectionSevenImage = mongoose.model('home_page_section_seven_images', SectionSevenSchema);

module.exports.offerImages = mongoose.model('offer_images', OfferImagesSchema);

module.exports.homePageSectionSix = mongoose.model('home_page_section_sixes', SectionSixSchema);

module.exports.settings = mongoose.model('settings', SettingsSchema);

module.exports.homePageSectionFourImage = mongoose.model('home_page_section_four_images', SectionFourSchema);

module.exports.homePageSectionFiveImage = mongoose.model('home_page_section_five_images', SectionFiveSchema);

module.exports.homePageSectionStatus = mongoose.model('home_page_section_statuses', SectionStatusSchema);

module.exports.siteViewers = mongoose.model('site_viewers', SiteViewersSchema);

module.exports.rentSectionStatus = mongoose.model('rent_page_section_statuses', RentSectionStatusSchema);

module.exports.buySectionStatus = mongoose.model('buy_page_section_statuses', BuySectionStatusSchema);

module.exports.salesforce = mongoose.model('salesforce', SalesforceSchema);
module.exports.usershortlist = mongoose.model('user_shortlist', UserShortlistSchema);
module.exports.usercompare = mongoose.model('user_compare', UserCompareSchema);
module.exports.recent_search = mongoose.model('recent_search', RecentSearchSchema);
module.exports.analytics = mongoose.model('analytics', AnalyticsSchema);