<?php

$id=uniqid();

foreach ($_FILES["images"]["error"] as $key => $error) {
    if ($error == UPLOAD_ERR_OK) {
		
      $name = $id.$_FILES["images"]["name"][$key];
	  echo $_FILES['images']['name'][$key];
     // move_uploaded_file( $_FILES["images"]["tmp_name"][$key], "../uploads_temp/" . $_FILES['images']['name'][$key]);
    }
}
exit;
echo "<h2>Successfully Uploaded Images</h2>";
