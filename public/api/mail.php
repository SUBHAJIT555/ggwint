<?php

// --- CORS ---
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = [
  'https://ggwint.com',
  'https://www.ggwint.com',
  'https://ggwint.vercel.app',
  'http://localhost',
  'http://localhost:3000',
  'http://127.0.0.1',
  'http://127.0.0.1:3000',
];

if ($origin && in_array($origin, $allowed, true)) {
  header("Access-Control-Allow-Origin: $origin");
  header('Vary: Origin');
} else {
  header("Access-Control-Allow-Origin: *");
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

// --- Timezone ---
date_default_timezone_set('Asia/Dubai');
mb_internal_encoding('UTF-8');

// Look above the site folder first (cPanel home), then inside the site folder.
$searchDirs = [dirname(__DIR__, 2), dirname(__DIR__)];
$autoload = null;
$envDir = null;
foreach ($searchDirs as $dir) {
  if ($autoload === null && is_file($dir . '/vendor/autoload.php')) {
    $autoload = $dir . '/vendor/autoload.php';
  }
  if ($envDir === null && is_file($dir . '/.env')) {
    $envDir = $dir;
  }
}

if ($autoload === null || $envDir === null) {
  http_response_code(500);
  echo json_encode([
    'status' => 'error',
    'message' => 'Mailer is not installed on the server yet.',
  ]);
  exit;
}

require $autoload;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

Dotenv::createImmutable($envDir)->load();

// --- Helpers ---
function v(string $key, string $default = ''): string
{
  return isset($_POST[$key]) ? trim((string) $_POST[$key]) : $default;
}

function clean(?string $s): string
{
  return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8');
}

function required(array $arr): ?string
{
  foreach ($arr as $k => $label) {
    if (!isset($_POST[$k]) || $_POST[$k] === '') {
      return "$label is required";
    }
  }
  return null;
}

/**
 * Validate phone number (supports international formats)
 */
function validatePhone(string $phone): bool
{
  // Remove all non-digit characters except + and spaces
  $cleaned = preg_replace('/[^\d+\s-]/', '', $phone);

  // Check if it has at least 10 digits
  $digits = preg_replace('/\D/', '', $cleaned);

  // Phone should have between 10 and 15 digits (international standard)
  return strlen($digits) >= 10 && strlen($digits) <= 15;
}

// --- Request validation ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['status' => 'error', 'message' => 'Only POST allowed.']);
  exit;
}

$formType = strip_tags(trim($_POST['formType'] ?? ''));

if (!in_array($formType, ['contact', 'newsletter', 'quote', 'callback'], true)) {
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => 'Invalid formType. Must be "contact", "newsletter", "quote", or "callback".']);
  exit;
}

// --- SMTP CONFIG ---
$smtpHost = $_ENV['SMTP_HOST'];
$smtpUser = $_ENV['SMTP_USER'];
$smtpPass = $_ENV['SMTP_PASS'];
$smtpPort = $_ENV['SMTP_PORT'];
$smtpSecure = $_ENV['SMTP_SECURE'];

$toAddresses = [['info@ggwint.com', 'G G W INTERNATIONAL GENERAL TRADING L.L.C']];
$fromEmail = $smtpUser;
$fromName = 'GGW International';

// --- Brand styling ---
$brandName = 'G G W INTERNATIONAL GENERAL TRADING L.L.C';
$tagline = 'Your Gateway to Global Trade';
$brandColor = '#2667FF';
$muted = '#6b7280';
$bg = '#f9fafb';
$cardBg = '#ffffff';
$border = '#e5e7eb';

// --- Validation and processing based on formType ---
$response = ["status" => "error", "message" => "Something went wrong!"];

if ($formType === 'contact') {
  // Contact form validation
  $firstName = strip_tags(trim($_POST['firstName'] ?? ''));
  $lastName = strip_tags(trim($_POST['lastName'] ?? ''));
  $email = strip_tags(trim($_POST['email'] ?? ''));
  $phone = strip_tags(trim($_POST['phone'] ?? ''));
  $message = strip_tags(trim($_POST['message'] ?? ''));
  $website = trim($_POST['website'] ?? '');
  $services = [];
  if (isset($_POST['services'])) {
    $rawServices = is_array($_POST['services']) ? $_POST['services'] : explode(',', (string) $_POST['services']);
    foreach ($rawServices as $service) {
      $service = strip_tags(trim((string) $service));
      if ($service !== '') {
        $services[] = $service;
      }
    }
  }
  $servicesLabel = $services ? implode(', ', $services) : '';

  // Honeypot check - silently exit if website field is filled
  if (!empty($website)) {
    // Silently exit - bot detected
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Thank you! Your submission has been received.']);
    exit;
  }

  // Phone is optional on the contact form.
  if (empty($firstName) || empty($lastName) || empty($email) || empty($message)) {
    $response["message"] = "Name, email, and message are required.";
    echo json_encode($response);
    exit;
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response["message"] = "Invalid email format!";
    echo json_encode($response);
    exit;
  }

  if ($phone !== '' && !validatePhone($phone)) {
    $response["message"] = "Invalid phone number format!";
    echo json_encode($response);
    exit;
  }

  $servicesRow = $servicesLabel !== ''
    ? '<tr><td style="padding:6px 12px 6px 0;vertical-align:top;"><strong>Product categories:</strong></td><td style="padding:6px 0;">' . htmlspecialchars($servicesLabel) . '</td></tr>'
    : '';
  $phoneRow = $phone !== ''
    ? '<tr><td style="padding:6px 12px 6px 0;vertical-align:top;"><strong>Phone:</strong></td><td style="padding:6px 0;">' . htmlspecialchars($phone) . '</td></tr>'
    : '';

  $mailSubject = $servicesLabel !== ''
    ? "New enquiry for $servicesLabel from $firstName $lastName"
    : "New contact form submission from $firstName $lastName";
  $mailBody = '
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; background: #f9f9f9; padding: 24px;">
      <h2 style="color: ' . $brandColor . '; border-bottom: 1px solid #e3e3e3; padding-bottom: 10px;">New Contact Form Submission</h2>
              <table style="width:100%; font-size: 16px; margin-top: 16px;">
                <tr><td style="padding:6px 12px 6px 0;vertical-align:top;"><strong>Name:</strong></td><td style="padding:6px 0;">' . htmlspecialchars($firstName . ' ' . $lastName) . '</td></tr>
                <tr><td style="padding:6px 12px 6px 0;vertical-align:top;"><strong>Email:</strong></td><td style="padding:6px 0;">' . htmlspecialchars($email) . '</td></tr>
                ' . $phoneRow . '
                ' . $servicesRow . '
                <tr><td style="padding:6px 12px 6px 0;vertical-align:top;"><strong>Message:</strong></td><td style="padding:6px 0;">' . nl2br(htmlspecialchars($message)) . '</td></tr>
              </table>
              <p style="color: #888; font-size: 13px; margin-top: 24px;">
                Time: ' . date('Y-m-d H:i:s') . ' (Dubai)
              </p>
            </div>';
  $mailAltBody = "New Contact Form Submission\n\nName: $firstName $lastName\nEmail: $email\nPhone: " . ($phone !== '' ? $phone : 'Not provided') . "\nProduct categories: " . ($servicesLabel !== '' ? $servicesLabel : 'None selected') . "\nMessage: $message\nTime: " . date('Y-m-d H:i:s') . " (Dubai)";
  $replyToEmail = $email;
  $replyToName = $firstName . ' ' . $lastName;

} elseif ($formType === 'newsletter') {
  // Newsletter form validation
  $email = strip_tags(trim($_POST['email'] ?? ''));
  $website = trim($_POST['website'] ?? '');

  // Honeypot check - silently exit if website field is filled
  if (!empty($website)) {
    // Silently exit - bot detected
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Thank you! Your subscription has been received.']);
    exit;
  }

  if (empty($email)) {
    $response["message"] = "Email is required!";
    echo json_encode($response);
    exit;
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response["message"] = "Invalid email format!";
    echo json_encode($response);
    exit;
  }

  // Email content for newsletter
  $mailSubject = "New newsletter subscription request";
  $mailBody = '
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; background: #f9f9f9; padding: 24px;">
      <h2 style="color: ' . $brandColor . '; border-bottom: 1px solid #e3e3e3; padding-bottom: 10px;">New Newsletter Subscriber</h2>
      <table style="width:100%; font-size: 16px; margin-top: 16px;">
        <tr><td><strong>Email:</strong></td><td>' . htmlspecialchars($email) . '</td></tr>
      </table>
      <p style="color: #888; font-size: 13px; margin-top: 24px;">
        Time: ' . date('Y-m-d H:i:s') . '
      </p>
    </div>';
  $mailAltBody = "New Newsletter Subscription\n\nEmail: $email\nTime: " . date('Y-m-d H:i:s');
  $replyToEmail = $email;
  $replyToName = $email;

} elseif ($formType === 'callback') {
  // Callback form validation
  $name = strip_tags(trim($_POST['name'] ?? ''));
  $phone = strip_tags(trim($_POST['phone'] ?? ''));
  $email = strip_tags(trim($_POST['email'] ?? ''));
  $enquiry = strip_tags(trim($_POST['enquiry'] ?? ''));
  $website = trim($_POST['website'] ?? '');

  // Honeypot check - silently exit if website field is filled
  if (!empty($website)) {
    // Silently exit - bot detected
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Thank you! Your request has been received.']);
    exit;
  }

  if (empty($name) || empty($phone) || empty($email) || empty($enquiry)) {
    $response["message"] = "All fields are required for callback request!";
    echo json_encode($response);
    exit;
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response["message"] = "Invalid email format!";
    echo json_encode($response);
    exit;
  }

  // Phone validation
  if (!validatePhone($phone)) {
    $response["message"] = "Invalid phone number format!";
    echo json_encode($response);
    exit;
  }

  // Email content for callback request
  $mailSubject = "New callback request from $name";
  $mailBody = '
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; background: #f9f9f9; padding: 24px;">
      <h2 style="color: ' . $brandColor . '; border-bottom: 1px solid #e3e3e3; padding-bottom: 10px;">New Callback Request</h2>
      <table style="width:100%; font-size: 16px; margin-top: 16px;">
        <tr><td><strong>Name:</strong></td><td>' . htmlspecialchars($name) . '</td></tr>
        <tr><td><strong>Phone:</strong></td><td>' . htmlspecialchars($phone) . '</td></tr>
        <tr><td><strong>Email:</strong></td><td>' . htmlspecialchars($email) . '</td></tr>
        <tr><td><strong>Enquiry For:</strong></td><td>' . htmlspecialchars($enquiry) . '</td></tr>
      </table>
      <p style="color: #888; font-size: 13px; margin-top: 24px;">
        Time: ' . date('Y-m-d H:i:s') . '
      </p>
    </div>';
  $mailAltBody = "New Callback Request\n\nName: $name\nPhone: $phone\nEmail: $email\nEnquiry For: $enquiry\nTime: " . date('Y-m-d H:i:s');
  $replyToEmail = $email;
  $replyToName = $name;

} elseif ($formType === 'quote') {
  // Quote form validation
  $website = trim($_POST['website'] ?? '');

  // Honeypot check - silently exit if website field is filled
  if (!empty($website)) {
    // Silently exit - bot detected
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Quote request sent successfully.']);
    exit;
  }

  if (
    $msg = required([
      'billing_first_name' => 'Billing First Name',
      'billing_last_name' => 'Billing Last Name',
      'billing_email' => 'Billing Email',
      'billing_phone' => 'Billing Phone',
      'billing_address' => 'Billing Address',
      'billing_town' => 'Billing Town',
      'billing_state' => 'Billing State',
      'cart_items' => 'Cart Items (JSON)',
      'cart_total' => 'Cart Total',
      'order_total' => 'Order Total',
    ])
  ) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => $msg]);
    exit;
  }

  $email = v('billing_email');
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => 'Invalid email.']);
    exit;
  }

  // Phone validation
  $billingPhone = v('billing_phone');
  if (!validatePhone($billingPhone)) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => 'Invalid billing phone number format.']);
    exit;
  }

  // Shipping phone validation (if provided)
  $shippingPhone = v('shipping_phone', '');
  if (!empty($shippingPhone) && !validatePhone($shippingPhone)) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => 'Invalid shipping phone number format.']);
    exit;
  }

  // Build cart HTML with size information
  $cartHtml = '';
  $cart = json_decode(v('cart_items'), true);

  if (is_array($cart) && count($cart)) {
    $cartHtml .= '
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin-top:8px;">
          <tr style="background:#f3f4f6;">
            <th align="left" style="padding:8px;border:1px solid ' . $border . ';font-family:Arial,Helvetica,sans-serif;">Item</th>
            <th align="left" style="padding:8px;border:1px solid ' . $border . ';font-family:Arial,Helvetica,sans-serif;">Category</th>
            <th align="center" style="padding:8px;border:1px solid ' . $border . ';font-family:Arial,Helvetica,sans-serif;">Qty</th>
            <th align="right" style="padding:8px;border:1px solid ' . $border . ';font-family:Arial,Helvetica,sans-serif;">Price</th>
            <th align="right" style="padding:8px;border:1px solid ' . $border . ';font-family:Arial,Helvetica,sans-serif;">Total</th>
          </tr>';

    foreach ($cart as $item) {
      $itemName = clean($item['title'] ?? $item['name'] ?? '');
      $itemCategory = clean($item['mainCategory'] ?? $item['category'] ?? '');
      $itemQty = clean($item['quantity'] ?? '1');
      $itemPrice = (float) ($item['price'] ?? 0);
      $itemTotal = number_format($itemPrice * (int) $itemQty, 2);

      $cartHtml .= '
            <tr>
              <td align="left" style="padding:8px;border:1px solid ' . $border . ';font-family:Arial,Helvetica,sans-serif;">' . $itemName . '</td>
              <td align="left" style="padding:8px;border:1px solid ' . $border . ';font-family:Arial,Helvetica,sans-serif;">' . $itemCategory . '</td>
              <td align="center" style="padding:8px;border:1px solid ' . $border . ';font-family:Arial,Helvetica,sans-serif;">' . $itemQty . '</td>
              <td align="right" style="padding:8px;border:1px solid ' . $border . ';font-family:Arial,Helvetica,sans-serif;">AED ' . number_format($itemPrice, 2) . '</td>
              <td align="right" style="padding:8px;border:1px solid ' . $border . ';font-family:Arial,Helvetica,sans-serif;">AED ' . $itemTotal . '</td>
            </tr>';
    }

    $cartHtml .= '</table>';
  } else {
    $cartHtml = '<p style="font-family:Arial,Helvetica,sans-serif;color:#333;">No items in cart.</p>';
  }

  // Order notes
  $orderNotes = v('order_notes');
  $notesHtml = '';
  if ($orderNotes) {
    $notesHtml = '
        <tr>
          <td style="padding:0 24px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border:1px solid ' . $border . ';border-radius:4px;">
              <tr><td style="background:#f3f4f6;padding:8px 10px;font-family:Arial,Helvetica,sans-serif;font-weight:600;color:' . $brandColor . ';">Order Notes</td></tr>
              <tr><td style="padding:10px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">' . nl2br(clean($orderNotes)) . '</td></tr>
            </table>
          </td>
        </tr>';
  }

  // Check if shipping info is different from billing
  $useShipping = !empty(v('shipping_first_name'));
  $shippingInfoHtml = '';

  if ($useShipping) {
    $shippingInfoHtml = '
        <tr>
          <td class="stack-column" valign="top" width="50%" style="padding:10px;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border:1px solid ' . $border . ';border-radius:4px;">
              <tr><td style="background:#f3f4f6;padding:8px 10px;font-family:Arial,Helvetica,sans-serif;font-weight:600;color:' . $brandColor . ';">Shipping Info</td></tr>
              <tr><td style="padding:10px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">
                <p><strong>' . clean(v('shipping_first_name') . ' ' . v('shipping_last_name')) . '</strong></p>
                <p>' . clean(v('shipping_email')) . '</p>
                <p>Phone: ' . clean(v('shipping_phone')) . '</p>
                <p>' . clean(v('shipping_address')) . ', ' . clean(v('shipping_town')) . ', ' . clean(v('shipping_state')) . '</p>
                <p>Postcode: ' . clean(v('shipping_postcode')) . '</p>
              </td></tr>
            </table>
          </td>
        </tr>';
  }

  // Main content for quote
  $mainContent = '
    <tr>
      <td style="padding:0 24px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td class="stack-column" valign="top" width="50%" style="padding:10px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border:1px solid ' . $border . ';border-radius:4px;">
                <tr><td style="background:#f3f4f6;padding:8px 10px;font-family:Arial,Helvetica,sans-serif;font-weight:600;color:' . $brandColor . ';">Billing Info</td></tr>
                <tr><td style="padding:10px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333;">
                  <p><strong>' . clean(v('billing_first_name') . ' ' . v('billing_last_name')) . '</strong></p>
                  <p>' . clean(v('billing_email')) . '</p>
                  <p>Phone: ' . clean(v('billing_phone')) . '</p>
                  <p>' . clean(v('billing_address')) . ', ' . clean(v('billing_town')) . ', ' . clean(v('billing_state')) . '</p>
                  <p>Postcode: ' . clean(v('billing_postcode')) . '</p>
                </td></tr>
              </table>
            </td>' . $shippingInfoHtml . '
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:0 24px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border:1px solid ' . $border . ';border-radius:4px;">
          <tr><td style="background:#f3f4f6;padding:8px 10px;font-family:Arial,Helvetica,sans-serif;font-weight:600;color:' . $brandColor . ';">Order Summary</td></tr>
          <tr><td style="padding:10px;">' . $cartHtml . '
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;border-collapse:collapse;">
              <tr><td align="right" style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-weight:600;color:' . $brandColor . ';">Cart Total:</td><td align="right" style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;">AED ' . clean(v('cart_total')) . '</td></tr>
              <tr><td align="right" style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-weight:600;color:' . $brandColor . ';">Order Total:</td><td align="right" style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;">AED ' . clean(v('order_total')) . '</td></tr>
            </table>
          </td></tr>
        </table>
      </td>
    </tr>' . $notesHtml;

  // HTML email template for quote
  ob_start(); ?>
  <!DOCTYPE html>
  <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title><?= clean('New Quote Request - ' . v('billing_first_name') . ' ' . v('billing_last_name')) ?></title>
    <!--[if mso]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          <o:AllowPNG/>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
    <style>
      body {
        margin: 0;
        padding: 0;
        background: #f9fafb;
        -webkit-text-size-adjust: none;
        text-size-adjust: none;
      }

      table,
      td {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }

      img {
        border: 0;
        display: block;
        line-height: 0;
      }

      @media (max-width:600px) {
        .stack-column {
          display: block !important;
          width: 100% !important;
        }
      }
    </style>
  </head>

  <body style="margin:0;padding:0;background:#f9fafb;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
      <tr>
        <td align="center" style="padding:30px 10px;">
          <table width="600" cellpadding="0" cellspacing="0" border="0" role="presentation"
            style="width:600px;max-width:100%;background:#ffffff;border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
            <tr>
              <td align="center" style="padding:30px 10px 20px;">
                <h1
                  style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:22px;color:<?= $brandColor ?>;font-weight:700;">
                  <?= clean($brandName) ?>
                </h1>
                <p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:<?= $muted ?>;">
                  <?= clean($tagline) ?>
                </p>
              </td>
            </tr>
            <tr>
              <td style="height:1px;background:#e5e7eb;"></td>
            </tr>
            <tr>
              <td align="center" style="padding:20px;">
                <p
                  style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:600;color:<?= $brandColor ?>;">
                  New Quote Request - <?= clean(v('billing_first_name') . ' ' . v('billing_last_name')) ?>
                </p>
                <p style="margin:4px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:<?= $muted ?>;">
                  Received at <?= date('Y-m-d H:i:s') ?> (Dubai)</p>
              </td>
            </tr>
            <?= $mainContent ?>
            <tr>
              <td align="center"
                style="padding:14px 20px;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:<?= $muted ?>;">
                This email was generated from the <strong><?= clean($brandName) ?></strong> website.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>

  </html>
  <?php
  $mailBody = ob_get_clean();
  $mailSubject = 'New Quote Request - ' . v('billing_first_name') . ' ' . v('billing_last_name');
  $mailAltBody = "New Quote Request\n\nBilling: " . v('billing_first_name') . " " . v('billing_last_name') . "\nEmail: " . v('billing_email') . "\nPhone: " . v('billing_phone') . "\nCart Total: AED " . v('cart_total') . "\nOrder Total: AED " . v('order_total') . "\n";
  $replyToEmail = $email;
  $replyToName = v('billing_first_name') . ' ' . v('billing_last_name');
}

// --- Send Email ---
try {
  $mail = new PHPMailer(true);
  $mail->isSMTP();
  $mail->Host = $smtpHost;
  $mail->SMTPAuth = true;
  $mail->Username = $smtpUser;
  $mail->Password = $smtpPass;
  $mail->SMTPSecure = $smtpSecure === 'smtps' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port = $smtpPort;
  $mail->CharSet = 'UTF-8';
  $mail->Encoding = 'base64';

  $mail->setFrom($fromEmail, $fromName);

  foreach ($toAddresses as [$addr, $nm]) {
    $mail->addAddress($addr, $nm);
  }

  $mail->addReplyTo($replyToEmail, $replyToName);

  $mail->isHTML(true);
  $mail->Subject = $mailSubject;
  $mail->Body = $mailBody;
  $mail->AltBody = $mailAltBody;

  $mail->send();

  // Success response format
  if ($formType === 'quote') {
    echo json_encode(['success' => true, 'status' => 'success', 'message' => 'Quote request sent successfully.']);
  } else {
    echo json_encode(['status' => 'success', 'message' => 'Thank you! Your submission has been received.']);
  }
} catch (Exception $e) {
  error_log('Mailer Error: ' . $mail->ErrorInfo);
  http_response_code(500);
  echo json_encode(['status' => 'error', 'message' => 'Failed to send email.']);
}
