import {getToken} from 'src/services/generic';

const token = getToken();

const CONFIG = {
  BASE_URL:                  window.location.href.split('/#')[0] || 'http://dev.hr.excellencetechnologies.in/',
  api_url:                   'http://dev.hr.excellencetechnologies.in/attendance/API_HR/api.php',
  other_api_url:             'http://dev.hr.excellencetechnologies.in/attendance/sal_info/api.php',
  api_url_salary:            'http://dev.hr.excellencetechnologies.in/attendance/sal_info',
  google_login_btn_page_url: 'http://dev.hr.excellencetechnologies.in/attendance/sal_info/google-api/drive_file/index.php?token=' + token,
  login_page_url:            'http://dev.hr.excellencetechnologies.in/',
  upload_url:                'http://dev.hr.excellencetechnologies.in/attendance/sal_info/upload_file.php',
  upload_leave_url:          'http://dev.hr.excellencetechnologies.in/attendance/API_HR/upload_leave_doc.php',
  upload_attendance_url:     'http://dev.hr.excellencetechnologies.in/attendance/upload_form.php',
  pdf_url:                   'http://dev.hr.excellencetechnologies.in/attendance/sal_info/',
  upload_email_attachment:   'http://dev.hr.excellencetechnologies.in/attendance/sal_info/upload_file_attachment.php',
  transfer_link:             'http://dev.hr.excellencetechnologies.in/attendance/sal_info/display_user_info.php',
  expressApiUrl:             'http://144.76.34.244:3017'
};

export default CONFIG;
