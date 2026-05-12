import { computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { startWith, map } from 'rxjs';

export function useFormUtils(form: FormGroup) {
  const formValid = toSignal(
    form.statusChanges.pipe(
      startWith(form.status),
      map((status) => status === 'VALID'),
    ),
    { initialValue: form.valid },
  );

  const canSave = computed(() => formValid());

  const isInvalidInput = (name: string) => {
    const control = form.get(name);
    return control ? control.touched && control.invalid : false;
  };

  return {
    formValid,
    canSave,
    isInvalidInput,
  };
}
