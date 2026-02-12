import parse from "html-react-parser";
import DOMPurify from "dompurify";

export const parseHtmlToReact = (html: string) => {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["p", "br", "strong", "em", "u", "a", "ul", "ol", "li"],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });
  return parse(clean);
};
