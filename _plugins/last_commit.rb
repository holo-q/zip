module Jekyll
  class LastCommitTag < Liquid::Tag
    def render(context)
      # Get the last commit date using git
      date_str = `git log -1 --format="%ai"`.strip
      if date_str.empty?
        # Fallback to build time if no git history
        context.registers[:site].time.strftime("%Y-%m-%d")
      else
        # Parse and format the git date
        DateTime.parse(date_str).strftime("%Y-%m-%d")
      end
    rescue => e
      # Fallback to build time on any error
      context.registers[:site].time.strftime("%Y-%m-%d")
    end
  end
end

Liquid::Template.register_tag('last_commit_date', Jekyll::LastCommitTag)