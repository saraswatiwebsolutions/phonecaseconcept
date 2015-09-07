<?php if ($modules) { ?>
<column id="column-left" class="col-sm-4 col-md-3 hidden-xs">
  <?php foreach ($modules as $module) { ?>
  <?php echo $module; ?>
  <?php } ?>
</column>
<?php } ?>