import { Spectator } from '../../../projects/spectator/src/lib/internals';
import { createTestComponentFactory } from '../../../projects/spectator/src/lib/spectator';
import { QueryService } from '../query.service';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let spectator: Spectator<ButtonComponent>;

  const createComponent = createTestComponentFactory<ButtonComponent>({
    component: ButtonComponent,
    componentProviders: [{ provide: QueryService, useValue: 'Netanel' }],
    mocks: [QueryService]
  });

  it('should set the "success" class by default', () => {
    spectator = createComponent();
    expect(spectator.query('button')).toHaveClass('success');
  });

  it('should set the class name according to the [className]', () => {
    spectator = createComponent();
    spectator.setInput('className', 'danger');
    expect(spectator.query('button')).toHaveClass('danger');
    expect(spectator.query('button')).not.toHaveClass('success');
  });

  it('should set the title according to the [title]', () => {
    spectator = createComponent({ title: 'Click' });

    expect(spectator.query('button')).toHaveText('Click');
  });

  it('should emit the $event on click', () => {
    spectator = createComponent();
    let output;
    spectator.output<{ type: string }>('click').subscribe(result => (output = result));

    spectator.component.onClick({ type: 'click' });
    expect(output).toEqual({ type: 'click' });
  });
});
