import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DocumentType {
  id: string;
  title: string;
  maxFiles: number;
  fileType: string;
  files: FileWithStatus[];
}

interface FileWithStatus {
  file: File;
  status: 'uploading' | 'completed';
  size: string;
}

@Component({
  selector: 'app-step-anexos',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './step-anexos.html',
  styleUrl: './step-anexos.css',
})
export class StepAnexos {
  @Input() formGroup!: FormGroup;

  documentTypes: DocumentType[] = [
    {
      id: 'matricula',
      title: 'Matrícula do Imóvel Atualizada (90 dias)',
      maxFiles: 1,
      fileType: '.pdf',
      files: []
    },
    {
      id: 'contrato',
      title: 'Contrato de Compra e Venda',
      maxFiles: 1,
      fileType: '.pdf',
      files: []
    },
    {
      id: 'docs-transmitente',
      title: 'Documentos Pessoais do(s) TRANSMITENTE(s)',
      maxFiles: 1,
      fileType: '.pdf',
      files: []
    },
    {
      id: 'docs-adquirente',
      title: 'Documentos Pessoais do(s) ADQUIRENTE(s)',
      maxFiles: 1,
      fileType: '.pdf',
      files: []
    },
    {
      id: 'procuracao',
      title: 'Procuração e Documento de Identificação do procurador',
      maxFiles: 1,
      fileType: '.pdf',
      files: []
    },
    {
      id: 'outros',
      title: 'Outros Documentos Necessários',
      maxFiles: 3,
      fileType: '.pdf',
      files: []
    }
  ];

  onFileSelect(event: any, docType: DocumentType) {
    const files = Array.from(event.target.files) as File[];
    const availableSlots = docType.maxFiles - docType.files.length;
    
    if (files.length <= availableSlots) {
      files.forEach(file => {
        const fileWithStatus: FileWithStatus = {
          file: file,
          status: 'uploading',
          size: this.formatFileSize(file.size)
        };
        docType.files.push(fileWithStatus);
        
        // Simulate upload completion after 2 seconds
        setTimeout(() => {
          fileWithStatus.status = 'completed';
        }, 2000);
      });
    } else {
      alert(`Você pode anexar no máximo ${docType.maxFiles} arquivo(s) para este documento.`);
    }
    
    // Reset input
    event.target.value = '';
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  removeFile(docType: DocumentType, fileIndex: number) {
    docType.files.splice(fileIndex, 1);
  }

  downloadFile(fileWithStatus: FileWithStatus) {
    const url = URL.createObjectURL(fileWithStatus.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileWithStatus.file.name;
    a.click();
    URL.revokeObjectURL(url);
  }

  openFile(fileWithStatus: FileWithStatus) {
    const url = URL.createObjectURL(fileWithStatus.file);
    window.open(url, '_blank');
  }

  canAddMore(docType: DocumentType): boolean {
    return docType.files.length < docType.maxFiles;
  }
}