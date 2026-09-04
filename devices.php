<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>ZXKAI Console</title><link rel="stylesheet" href="style.css"></head>
<body class="console">
<header><div class="branddot">◉</div><div class="navlogo">Z X K A I X S O N U</div><div class="connected">● Connected</div><div class="telegram">➤</div><div class="clock">◷ 19:51</div><button>⇥ Logout</button></header>
<main class="dashboard">
<section class="stats"><div><small>TOTAL</small><b>535</b></div><div><small>ONLINE</small><b class="green">81</b></div><div><small>OFFLINE</small><b>454</b></div><div><small>BANK SMS</small><b class="green">0</b></div></section>
<nav class="filters"><span class="active">All</span><span>Online</span><span>Offline</span><span>Upl</span><span>Bank</span></nav>
<div class="toolbar"><span>Card</span><select><option>Newest</option></select><button>⟳</button></div>
<div class="loading">◌ &nbsp; Loading SMS data...</div>
<div class="cards">
<?php
$items=[
['ffabaf5d6d5ea4e','41%','Offline'],
['ff18b5c228d9ae76','46%','Online'],
['fe916b6df3610171','44%','Offline'],
['fe589fd08f4dabe5','70%','Offline'],
['fcc4004a73b3bb3f','36%','Offline']
];
foreach($items as $i=>$x): ?>
<article class="device"><div class="devhead"><div class="wifiicon">⌁</div><div><strong><?=htmlspecialchars($x[0])?></strong><small><?=htmlspecialchars($x[0])?></small></div><span>⋮</span></div>
<div class="meta"><div><small>ANDROID</small><b>—</b></div><div><small>BATTERY</small><b class="battery">▭ &nbsp;<?=$x[1]?></b></div></div>
<div class="number"><small>NUMBER</small><b>—</b></div>
<div class="status <?=$x[2]=='Online'?'on':''?>">● &nbsp;<?=$x[2]?></div></article>
<?php endforeach; ?>
</div>
</main></body></html>