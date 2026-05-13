import { Component, input, output, signal, OnInit, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MarkdownComponent, provideMarkdown } from 'ngx-markdown';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownComponent],
  templateUrl: './note-editor.component.html',
  providers: [
    provideMarkdown(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NoteEditorComponent),
      multi: true,
    },
  ],
  styleUrl: './note-editor.component.scss',
})
export class NoteEditorComponent implements ControlValueAccessor, OnInit {
  public initialContent = input<string>('');
  public onlyView = input<boolean>(false);

  public saved = output<string>();
  public cancelled = output<void>();
  public content = '';
  public disabled = signal(false);
  public mode = signal<'edit' | 'preview'>('edit');

  private onChange: (value: string) => void = () => {};
  public onTouched: () => void = () => {};

  ngOnInit() {
    this.content = this.initialContent();
  }

  onModelChange(newValue: string) {
    this.content = newValue;
    this.onChange(newValue); // Notificamos al FormContol
  }

  writeValue(value: string): void {
    this.content = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
