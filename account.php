<?php
$numbers = [];
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['script']) || $_FILES['script']['error'] !== UPLOAD_ERR_OK) {
        $error = 'Please choose a script file.';
    } else {
        $name = $_FILES['script']['name'];
        $tmp = $_FILES['script']['tmp_name'];
        $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
        $allowed = ['js','json','txt','html','htm','xml','php'];
        if (!in_array($ext, $allowed, true)) {
            $error = 'Supported demo formats: JS, JSON, TXT, HTML, XML, PHP.';
        } else {
            $data = file_get_contents($tmp);
            // Extract phone-like strings from the uploaded script/config.
            // This only parses the uploaded file; it does not access SMS/OTP.
            preg_match_all('/(?<!\d)(?:\+?\d[\d\s().-]{7,}\d)(?!\d)/', $data, $m);
            foreach ($m[0] as $n) {
                $n = trim($n);
                $digits = preg_replace('/\D+/', '', $n);
                if (strlen($digits) >= 8 && strlen($digits) <= 15) {
                    $numbers[] = $n;
                }
            }
            $numbers = array_values(array_unique($numbers));
            $_SESSION['demo_numbers'] = $numbers;
            $_SESSION['demo_filename'] = $name;
            header('Location: result.php');
            exit;
        }
    }
}
?>
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>New Firebase Account</title><link rel="stylesheet" href="style.css"></head>
<body>
<div class="shell">
  <div class="minihero"><div class="logo"><i>Z</i>XKAI</div><div class="subtitle">Device Management Console</div></div>
  <section class="panel formpanel">
    <div class="back"><a href="index.php">‹</a><h1>New Firebase Account</h1></div>
    <?php if($error): ?><div class="error"><?=htmlspecialchars($error)?></div><?php endif; ?>
    <form method="post" enctype="multipart/form-data">
      <label>SCRIPT / CONFIG FILE</label>
      <div class="upload" onclick="document.getElementById('script').click()">
        <div class="uploadicon">⇧</div><strong id="fileName">Upload Script File</strong>
        <small>JS, JSON, TXT, HTML, XML or PHP</small>
        <input id="script" name="script" type="file" accept=".js,.json,.txt,.html,.htm,.xml,.php" hidden required>
      </div>
      <label>FRIENDLY LABEL (OPTIONAL)</label>
      <input name="label" placeholder="e.g. My Project">
      <p class="hint">The demo parses number-like values contained in the uploaded file. It does not read or intercept SMS/OTP.</p>
      <div class="actions"><button class="save" type="submit">⚡ Upload &amp; Show Result</button><a class="cancel" href="index.php">Cancel</a></div>
    </form>
  </section>
</div>
<script>
document.getElementById('script').addEventListener('change', function(){
  document.getElementById('fileName').textContent=this.files[0]?.name || 'Upload Script File';
});
</script>
</body></html>