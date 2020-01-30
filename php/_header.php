<?php

//    $current = basename(__FILE__, '.php');
//    echo $current;
//    $actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
//    echo $actual_link;

    $pageId = strtolower(str_replace(".php","",basename($_SERVER['PHP_SELF'])));
//    echo $pageId;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PHP Test</title>
    <link rel="stylesheet" href="bootstrap.min.css" type="text/css">
</head>
<body>


<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item <?= ($pageId == 'index' ? 'active' : '') ?>">
                <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item <?= ($pageId == 'features' ? 'active' : '') ?>">
                <a class="nav-link" href="/features.php">Features</a>
            </li>
            <li class="nav-item <?= ($pageId == 'pricing' ? 'active' : '') ?>">
                <a class="nav-link" href="#">Pricing</a>
            </li>
            <li class="nav-item <?= ($pageId == 'about' ? 'active' : '') ?>">
                <a class="nav-link" href="/about.php">About</a>
            </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="text" placeholder="Search">
            <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form>
    </div>
</nav>

<div class="container">
