import jss from 'jss';
import preset from 'jss-preset-default';

jss.setup(preset());

export function createStyleSheet(styles) {
  return jss.createStyleSheet(styles).attach();
}
