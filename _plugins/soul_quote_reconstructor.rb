require 'digest'
require 'base64'

module Jekyll
  class SoulQuoteReconstructor < Generator
    safe true
    priority :highest

    def generate(site)
      quotes = reconstruct_quotes(site.source)
      
      # Store quotes in site data for access in templates
      site.data['soul_quotes'] = quotes
      
      Jekyll.logger.info "Soul Quotes:", "Reconstructed #{quotes.length} consciousness fragments"
    end

    private

    def reconstruct_quotes(base_path)
      found_fragments = {}
      
      # Scan cymematics directory
      cymematics_path = File.join(base_path, 'cymematics')
      return [] unless Dir.exist?(cymematics_path)
      
      Dir.glob(File.join(cymematics_path, '**', '*'), File::FNM_DOTMATCH).each do |filepath|
        next unless File.file?(filepath)
        
        begin
          content = File.read(filepath).strip
          lines = content.split("\n")
          
          # Check if it has our marker
          if lines.length >= 2 && lines[1].start_with?('#')
            fragment = lines[0]
            marker = lines[1]
            checksum, method, quote_idx = marker[1..-1].split('#')
            
            quote_idx = quote_idx.to_i
            found_fragments[quote_idx] ||= {}
            found_fragments[quote_idx][method] = fragment
          end
        rescue => e
          # Silently continue on errors
        end
      end
      
      # Reconstruct quotes using ROT13 (reversible)
      quotes = []
      found_fragments.keys.sort.each do |quote_idx|
        fragments = found_fragments[quote_idx]
        if fragments['rot13']
          # Decode ROT13
          original = fragments['rot13'].tr('A-Za-z', 'N-ZA-Mn-za-m')
          quotes << original
        else
          Jekyll.logger.warn "Soul Quotes:", "Missing rot13 for index #{quote_idx}"
        end
      end
      
      quotes
    end
  end
end