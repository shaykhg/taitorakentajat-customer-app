export class AppConstants {
  constructor() {
  }

  public static BASE_URL = 'https://api.taitorakentajat.fi';
  public static API = {
    LOGIN: AppConstants.BASE_URL + '/auth/local',
    // REGISTER: AppConstants.BASE_URL + '/signup',
    REGISTER: AppConstants.BASE_URL + '/auth/local/register',
    SERVICES: AppConstants.BASE_URL + '/services',
    PACKAGES: AppConstants.BASE_URL + '/product-packages',
    SLOTS: AppConstants.BASE_URL + '/slots',
    PLACE_BOOKING: AppConstants.BASE_URL + '/placeBooking',
    UPLOAD_IMAGES: AppConstants.BASE_URL + '/upload',
    POSTCODE: AppConstants.BASE_URL + '/cities',
    BLOGS: AppConstants.BASE_URL + '/blogs',
    BOOKING: AppConstants.BASE_URL + '/bookings',
    BOOKING_COMPLETE: AppConstants.BASE_URL + '/booking/complete/',
    MY_BOOKINGS: AppConstants.BASE_URL + '/bookings/me',
    PROFILE: AppConstants.BASE_URL + '/profile',
    CREATESTAFF: AppConstants.BASE_URL + '/createStaff',
    COMPANIES: AppConstants.BASE_URL + '/companies',
    FORGOT_PASSWORD: AppConstants.BASE_URL + '/auth/forgot-password',
    RESET_PASSWORD: AppConstants.BASE_URL + '/auth/reset-password',
    REVIEW: AppConstants.BASE_URL + '/reviews',
    REVIEW_EXIST: AppConstants.BASE_URL + '/reviews/booking',
    POST_REVIEW: AppConstants.BASE_URL + '/addReview',
    PRODUCT: AppConstants.BASE_URL + '/products/',
    USERS: AppConstants.BASE_URL + '/users',
    ACCOUNTS: AppConstants.BASE_URL + '/accounts'
  };

  public static selectedService;
}
