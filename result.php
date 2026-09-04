<?php
session_start();
$numbers = $_SESSION['demo_numbers'] ?? [];
$filename = $_SESSION['demo_filename'] ?? 'Uploaded script';
?>
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Script Result — ZXKAI Demo</title><link rel="stylesheet" href="style.css"></head>
<body class="console">
<header><div class="branddot">◉</div><div class="navlogo">Z X K A I X S O N U</div><div class="connected">● Parsed</div><a class="logout" href="index.php">×</a></header>
<main class="detail">
<section class="device-title"><div class="wifiicon onwifi">⌁</div><div><strong>Script Result</strong><small><?=htmlspecialchars($filename)?></small></div></section>
<div class="onlinebar"><b>● Result Ready</b><span><?=count($numbers)?> number(s) found</span><em>Demo</em></div>
<nav class="tabs"><a class="active" href="#numbers">Numbers</a><a href="#sms">OTP</a></nav>
<section id="numbers" class="info">
<h4>NUMBERS FOUND IN UPLOADED SCRIPT</h4>
<?php if (!$numbers): ?>
  <div class="device"><p>No phone-like numbers were found in the uploaded file.</p></div>
<?php else: foreach($numbers as $i=>$number): ?>
  <div class="number-card"><div><small>NUMBER #<?=($i+1)?></small><b><?=htmlspecialchars($number)?></b></div>
  <button onclick="navigator.clipboard?.writeText(<?=json_encode($number)?>);this.textContent='Copied'">Copy</button></div>
<?php endforeach; endif; ?>
</section>
<section id="sms" class="sms">
<div class="smshead">OTP / SMS <span>Demo only</span></div>
<article><header><strong>OTP STATUS</strong><time>Waiting</time></header><p>For a real verification flow, connect your own authorized OTP provider/webhook. This demo does not read incoming SMS.</p></article>
</section>
</main></body></html>