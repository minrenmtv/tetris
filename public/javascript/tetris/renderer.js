tetris.renderer = function(drawingCanvas) {
  var t = function(x) {
    return x * 20;
  };

  var context = null;
  if (drawingCanvas.getContext) {
    context = drawingCanvas.getContext('2d');
  }

  var x_offset = 10;
  var y_offset = 10;

  var render_stage = function(stage) {
    context.fillStyle   = '#ccc';
    context.strokeStyle = '#000';
    context.lineWidth   = 2;

    context.fillRect(x_offset, y_offset, t(stage.width), t(stage.height));
    context.strokeRect(x_offset, y_offset, t(stage.width), t(stage.height));

    context.fillStyle   = '#f00';
    context.strokeStyle = "#000";
    context.lineWidth   = 2;
    render_blocks(stage.dead_blocks(), stage);
  }

  var render_tetromino = function(tetromino, stage) {
    context.fillStyle   = '#ff0';
    context.strokeStyle = "#000";
    context.lineWidth   = 2;
    render_blocks(tetromino.blocks(), stage);
  };

  var render_blocks = function(blocks, stage) {
    context.save();
    context.beginPath();
    context.moveTo(x_offset, y_offset);
    context.lineTo( x_offset + t(stage.width), y_offset                   );
    context.lineTo( x_offset + t(stage.width), y_offset + t(stage.height) );
    context.lineTo( x_offset                 , y_offset + t(stage.height) );
    context.lineTo( x_offset                 , y_offset                   );
    context.closePath();
    context.clip();

    for (var i = 0; i < blocks.length; i += 1) {
      context.fillRect(
        x_offset + t(blocks[i].x()),
        y_offset + t(blocks[i].y()),
        t(1),
        t(1)
      );
      context.strokeRect(
        x_offset + t(blocks[i].x()),
        y_offset + t(blocks[i].y()),
        t(1),
        t(1)
      );
    }

    context.restore();
  };

  return {
    render_stage: render_stage,
    render_tetromino: render_tetromino
  };
};
