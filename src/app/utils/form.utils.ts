import { computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { startWith, map } from 'rxjs';

/**
 * Hook composable para manejar lógica de formularios con Signals.
 * Metodología IkedaDev: Desacoplamiento y Reactividad Pura.
 */
export function useFormUtils(form: FormGroup) {
  // 1. Convertimos el estado del formulario a Signal
  const formValid = toSignal(
    form.statusChanges.pipe(
      startWith(form.status),
      map((status) => status === 'VALID'),
    ),
    { initialValue: form.valid },
  );

  // 2. Definimos las utilidades reactivas
  const canSave = computed(() => formValid());

  const isInvalidInput = (name: string) => {
    const control = form.get(name);
    return control ? control.touched && control.invalid : false;
  };

  // Retornamos solo lo que el componente necesita
  return {
    formValid,
    canSave,
    isInvalidInput,
  };
}
