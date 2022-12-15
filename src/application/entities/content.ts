export class Content {
  private readonly content: string;

  constructor(content: string) {
    const isContentLengthValid = this.validateContentLenght(content);
    if (!isContentLengthValid) {
      throw new Error('Content length error');
    }
    this.content = content;
  }

  private validateContentLenght(content: string) {
    return content.length >= 5 && content.length <= 240;
  }

  get value(): string {
    return this.content;
  }
}
